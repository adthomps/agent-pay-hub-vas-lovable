import { RefreshCw, Send, X } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { useInvoices, type Invoice } from "@/hooks/useInvoices";

const STATUS_COLORS = {
  draft: "secondary",
  sent: "default", 
  paid: "default",
  cancelled: "secondary",
} as const;

const STATUS_STYLES = {
  draft: "bg-warning/10 text-warning-foreground border-warning/20",
  sent: "bg-primary/10 text-primary border-primary/20",
  paid: "bg-success/10 text-success-foreground border-success/20", 
  cancelled: "bg-muted text-muted-foreground border-border",
} as const;

function StatusBadge({ status }: { status: Invoice["status"] }) {
  return (
    <Badge 
      variant={STATUS_COLORS[status]}
      className={STATUS_STYLES[status]}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </Badge>
  );
}

export function InvoicesTable() {
  const { invoices, loading, sendInvoice, cancelInvoice, refreshInvoices } = useInvoices();

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Invoices</CardTitle>
          <Button 
            variant="outline" 
            size="sm"
            onClick={refreshInvoices}
            disabled={loading}
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${loading ? "animate-spin" : ""}`} />
            Refresh
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="flex items-center justify-center py-8">
            <div className="text-muted-foreground">Loading invoices...</div>
          </div>
        ) : invoices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No invoices found. Create your first invoice below.
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {invoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium font-mono text-sm">
                      {invoice.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      {invoice.currency} {invoice.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div>
                        {invoice.name && (
                          <div className="font-medium">{invoice.name}</div>
                        )}
                        <div className="text-sm text-muted-foreground">
                          {invoice.email}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell className="text-sm">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        {invoice.status === "draft" && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => sendInvoice(invoice.id)}
                            className="hover:bg-primary/5"
                          >
                            <Send className="w-3 h-3 mr-1" />
                            Send
                          </Button>
                        )}
                        {(invoice.status === "draft" || invoice.status === "sent") && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => cancelInvoice(invoice.id)}
                            className="hover:bg-destructive/5 text-destructive border-destructive/20"
                          >
                            <X className="w-3 h-3 mr-1" />
                            Cancel
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}