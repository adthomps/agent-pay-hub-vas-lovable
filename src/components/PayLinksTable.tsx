import { RefreshCw, Copy, ExternalLink, MoreVertical } from "lucide-react";
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
import { usePayLinks, type PayLink } from "@/hooks/usePayLinks";
import { useToast } from "@/hooks/use-toast";

export function PayLinksTable() {
  const { payLinks, loading, refreshPayLinks } = usePayLinks();
  const { toast } = useToast();

  // Show only the last 5 pay links
  const recentPayLinks = payLinks.slice(0, 5);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied",
        description: "Link copied to clipboard",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard",
        variant: "destructive",
      });
    }
  };

  const openLink = (url: string) => {
    window.open(url, "_blank");
  };

  const getPayLinkType = (memo: string): 'donation' | 'product' => {
    const lowerMemo = memo?.toLowerCase() || '';
    if (lowerMemo.includes('donation') || lowerMemo.includes('donate') || lowerMemo.includes('gift') || lowerMemo.includes('charity')) {
      return 'donation';
    }
    return 'product';
  };

  return (
    <Card className="shadow-card">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">
            Recent Pay-by-Links
            {payLinks.length > 0 && (
              <span className="ml-2 text-sm font-normal text-muted-foreground">
                (Last {recentPayLinks.length} of {payLinks.length})
              </span>
            )}
          </CardTitle>
          <Button
            variant="outline" 
            size="sm"
            onClick={refreshPayLinks}
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
            <div className="text-muted-foreground">Loading pay links...</div>
          </div>
        ) : recentPayLinks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            No pay links found. Create your first pay link below.
          </div>
        ) : (
          <div className="overflow-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="hidden sm:table-cell">ID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead className="hidden md:table-cell">Memo</TableHead>
                  <TableHead className="hidden lg:table-cell">Type</TableHead>
                  <TableHead className="hidden xl:table-cell">Created</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {recentPayLinks.map((link) => (
                  <TableRow key={link.id}>
                    <TableCell className="font-medium font-mono text-xs hidden sm:table-cell">
                      {link.id}
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="sm:hidden text-xs text-muted-foreground mb-1">
                        {link.id}
                      </div>
                      {link.currency} {link.amount.toFixed(2)}
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <div className="text-sm">
                        {link.memo || "No memo"}
                      </div>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Badge variant={getPayLinkType(link.memo) === 'donation' ? 'secondary' : 'default'}>
                        {getPayLinkType(link.memo)}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-xs hidden xl:table-cell">
                      {new Date(link.createdAt).toLocaleDateString()}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          <DropdownMenuItem onClick={() => copyToClipboard(link.url)}>
                            <Copy className="mr-2 h-4 w-4" />
                            Copy Payment Link
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem onClick={() => openLink(link.url)}>
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