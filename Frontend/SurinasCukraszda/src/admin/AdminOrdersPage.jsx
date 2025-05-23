import React, { useEffect, useState } from "react";
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  CircularProgress,
  Typography,
  Box,
} from "@mui/material";
import OrderRow from "./OrderRow";
import "./AdminOrdersPage.css";

const API_BASE = import.meta.env.VITE_API_BASE_URL;

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch(`${API_BASE}/api/admin/orders`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("Hiba a rendelések lekérésekor");
        const data = await res.json();
        setOrders(data.orders);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Paper className="admin-orders-container">
      <Typography variant="h5" gutterBottom>
        Admin – Rendelések kezelése
      </Typography>
      <div className="admin-orders-tableContainer">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>ID</TableCell>
              <TableCell>Felhasználó</TableCell>
              <TableCell>Összeg</TableCell>
              <TableCell>Leadás</TableCell>
              <TableCell>Státusz</TableCell>
              <TableCell>Átvételi dátum</TableCell>
              <TableCell>Akció</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders.map((order) => (
              <OrderRow
                key={order._id}
                order={order}
                onUpdate={(id, update) =>
                  setOrders(
                    orders.map((o) => (o._id === id ? { ...o, ...update } : o))
                  )
                }
              />
            ))}
          </TableBody>
        </Table>
      </div>
    </Paper>
  );
}
