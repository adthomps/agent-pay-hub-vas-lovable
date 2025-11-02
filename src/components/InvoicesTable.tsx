import { RefreshCw, Send, X, MoreVertical, Edit, XCircle, Copy, ExternalLink } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
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
  
  // Show only the last 5 invoices
  const recentInvoices = invoices.slice(0, 5);

  const handleUpdateInvoice = (id: string) => {
    // Placeholder for update functionality
    console.log('Update invoice:', id);
  };

  const handleCopyPaymentLink = async (id: string) => {
    const link = `${window.location.origin}/invoice/${id}`;
    await navigator.clipboard.writeText(link);
  };

  const handleOpenPaymentForm = (id: string) => {
    window.open(`/invoice/${id}`, '_blank');
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Recent Invoices
            {invoices.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                (Last {recentInvoices.length} of {invoices.length})
              </span>
            )}
          </CardTitle>
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
        ) : recentInvoices.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No invoices found. Create your first invoice below.
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden md:table-cell">Status</TableHead>
                  <TableHead className="hidden lg:table-cell">Due Date</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentInvoices.map((invoice) => (
                  <TableRow key={invoice.id}>
                    <TableCell className="font-medium font-mono text-xs hidden sm:table-cell">
                      {invoice.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="sm:hidden text-xs text-muted-foreground mb-1">
                        {invoice.id}
                      </div>
                      {invoice.currency} {invoice.amount.toFixed(2)}
                    </TableCell>
                    <TableCell>
                      <div>
                        {invoice.name && (
                          <div className="font-medium text-sm">{invoice.name}</div>
                        )}
                        <div className="text-xs text-muted-foreground">
                          {invoice.email}
                        </div>
                        <div className="md:hidden mt-1">
                          <StatusBadge status={invoice.status} />
                        </div>
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <StatusBadge status={invoice.status} />
                    </TableCell>
                    <TableCell className="text-xs hidden lg:table-cell">
                      {new Date(invoice.dueDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {invoice.status === "draft" && (
                            <>
                              <DropdownMenuItem onClick={() => sendInvoice(invoice.id)}>
                                <Send className="mr-2 h-4 w-4" />
                                Send
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          <DropdownMenuItem onClick={() => handleUpdateInvoice(invoice.id)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Update
                          </DropdownMenuItem>
                          {(invoice.status === "draft" || invoice.status === "sent") && (
                            <>
                              <DropdownMenuItem 
                                onClick={() => cancelInvoice(invoice.id)}
                                className="text-destructive focus:text-destructive"
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Cancel
                              </DropdownMenuItem>
                            </>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => handleCopyPaymentLink(invoice.id)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Payment Link
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleOpenPaymentForm(invoice.id)}>
                            <ExternalLink className="mr-2 h-4 w-4" />
                            Open Payment Form
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
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