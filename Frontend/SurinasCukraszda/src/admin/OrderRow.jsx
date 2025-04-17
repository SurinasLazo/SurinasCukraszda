// src/admin/OrderRow.jsx
import React, { useState } from "react";
import {
  TableRow,
  TableCell,
  Select,
  MenuItem,
  TextField,
  Button,
  IconButton,
  Collapse,
  Box,
  Table,
  TableHead,
  TableBody,
  Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import dayjs from "dayjs";
import "./OrderRow.css";

const statusOptions = [
  { value: "pending", label: "Függőben" },
  { value: "confirmed", label: "Megerősítve" },
  { value: "ready_for_pickup", label: "Átvételre kész" },
  { value: "completed", label: "Teljesítve" },
  { value: "canceled", label: "Törölve" },
];

export default function OrderRow({ order, onUpdate }) {
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState(order.status);
  const [pickupDate, setPickupDate] = useState(
    order.pickupDate ? dayjs(order.pickupDate) : null
  );
  const [saving, setSaving] = useState(false);

  const saveChanges = async () => {
    setSaving(true);
    try {
      const token = localStorage.getItem("token");
      const body = { status };
      if (status === "ready_for_pickup") {
        body.pickupDate = pickupDate?.toISOString();
      }
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/admin/orders/${order._id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(body),
        }
      );
      if (!res.ok) throw new Error("Frissítés hiba");
      const { order: updated } = await res.json();
      onUpdate(order._id, updated);
    } catch (err) {
      console.error(err);
      alert("Nem sikerült menteni.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <>
      {/* fő sor */}
      <TableRow className="order-row">
        {/* expand/collapse gomb */}
        <TableCell>
          <IconButton size="small" onClick={() => setOpen((o) => !o)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>

        <TableCell>{order._id}</TableCell>
        <TableCell>
          {order.user.name} ({order.user.email})
        </TableCell>
        <TableCell>{order.total.toFixed(2)} Ft</TableCell>
        <TableCell>
          {new Date(order.createdAt).toLocaleString("hu-HU")}
        </TableCell>
        <TableCell>
          <Select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size="small"
          >
            {statusOptions.map((o) => (
              <MenuItem key={o.value} value={o.value}>
                {o.label}
              </MenuItem>
            ))}
          </Select>
        </TableCell>
        <TableCell>
          {status === "ready_for_pickup" && (
            <DatePicker
              label="Átvétel dátuma"
              value={pickupDate}
              onChange={setPickupDate}
              renderInput={(props) => <TextField {...props} size="small" />}
            />
          )}
        </TableCell>
        <TableCell>
          <Button
            variant="contained"
            size="small"
            onClick={saveChanges}
            disabled={saving}
          >
            Mentés
          </Button>
        </TableCell>
      </TableRow>

      {/* kibontott részletek */}
      <TableRow>
        <TableCell style={{ padding: 0 }} colSpan={8}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className="order-details-box" margin={1}>
              <Typography variant="subtitle1" gutterBottom>
                Rendelés tételek
              </Typography>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>Termék</TableCell>
                    <TableCell>Mennyiség</TableCell>
                    <TableCell>Egységár</TableCell>
                    <TableCell>Részösszeg</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {order.items.map((item) => (
                    <TableRow key={item.product._id}>
                      <TableCell>{item.product.name}</TableCell>
                      <TableCell>{item.quantity}</TableCell>
                      <TableCell>{item.product.price.toFixed(2)} Ft</TableCell>
                      <TableCell>
                        {(item.quantity * item.product.price).toFixed(2)} Ft
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}
