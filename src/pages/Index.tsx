
import { useState } from "react";
import Header from "@/components/Header";
import GiveBonus from "@/components/GiveBonus";
import Dashboard from "@/components/Dashboard";
import BonusFeed from "@/components/BonusFeed";
import UserCard from "@/components/UserCard";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getUserById, users } from "@/data/mockData";

const Index = () => {
  const [isGiveBonusOpen, setIsGiveBonusOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<string | null>(null);
  
  const handleGiveBonus = (userId: string) => {
    setSelectedUserId(userId);
    setIsGiveBonusOpen(true);
  };
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 container py-6">
        <Tabs defaultValue="dashboard" className="w-full">
          <div className="flex items-center justify-between mb-6">
            <TabsList>
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="feed">Feed</TabsTrigger>
              <TabsTrigger value="team">Team</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="dashboard" className="space-y-4">
            <Dashboard onGiveBonus={handleGiveBonus} />
          </TabsContent>
          
          <TabsContent value="feed">
            <div className="max-w-2xl mx-auto">
              <BonusFeed />
            </div>
          </TabsContent>
          
          <TabsContent value="team">
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {users.map(user => (
                <UserCard
                  key={user.id}
                  user={user}
                  onGiveBonus={handleGiveBonus}
                />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
      
      <Dialog open={isGiveBonusOpen} onOpenChange={setIsGiveBonusOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <GiveBonus />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;
