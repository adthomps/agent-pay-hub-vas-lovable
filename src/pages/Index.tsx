import { AgentBox } from "@/components/AgentBox";
import { InvoicesTable } from "@/components/InvoicesTable";
import { CreateInvoiceForm } from "@/components/CreateInvoiceForm";
import { CreatePayLinkForm } from "@/components/CreatePayLinkForm";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="h-8 w-8 rounded-lg bg-gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-sm">V</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">
                Visa Acceptance Agent Toolkit
              </h1>
              <p className="text-sm text-muted-foreground">
                Payment processing made simple
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left Column */}
          <div className="space-y-6">
            <AgentBox />
            <CreateInvoiceForm />
            <CreatePayLinkForm />
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <InvoicesTable />
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
