import { AgentBox } from "@/components/AgentBox";
import { InvoicesTable } from "@/components/InvoicesTable";
import { PayLinksTable } from "@/components/PayLinksTable";
import { CreateInvoiceForm } from "@/components/CreateInvoiceForm";
import { CreatePayLinkForm } from "@/components/CreatePayLinkForm";
import { ThemeToggle } from "@/components/ThemeToggle";
import { HealthCheckButton } from "@/components/HealthCheckButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">V</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">
                  Visa Acceptance Agent Toolkit
                </h1>
                <p className="text-sm text-muted-foreground hidden sm:block">
                  Payment processing made simple
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6 pb-safe space-y-6">
        {/* Row 1: AI Agent Assistant */}
        <AgentBox />

        {/* Row 2: Create Forms */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <CreateInvoiceForm />
          <CreatePayLinkForm />
        </div>

        {/* Row 3: Data Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <InvoicesTable />
          <PayLinksTable />
        </div>

        {/* Row 4: Diagnostics */}
        <div className="flex justify-center">
          <HealthCheckButton />
        </div>
      </main>
    </div>
  );
};

export default Index;
