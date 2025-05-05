
import { BarChart, Calendar, Star, TrendingUp, Users } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import BonusFeed from "./BonusFeed";
import UserCard from "./UserCard";
import { users } from "@/data/mockData";

interface DashboardProps {
  onGiveBonus: (userId: string) => void;
}

const Dashboard = ({ onGiveBonus }: DashboardProps) => {
  // Take 4 users for the team section
  const teamMembers = users.slice(1, 5);
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      <Card className="col-span-full">
        <CardHeader className="flex flex-row items-center justify-between pb-2">
          <div className="space-y-0.5">
            <CardTitle className="text-lg">Welcome back!</CardTitle>
            <CardDescription>
              You have 150 points to give this month.
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
            <div className="flex items-center gap-2 p-2">
              <div className="p-2 rounded-full bg-bonusly-purple/10">
                <TrendingUp className="h-4 w-4 text-bonusly-purple" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Your Points</p>
                <p className="text-xl font-medium">320</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2">
              <div className="p-2 rounded-full bg-bonusly-green/10">
                <Star className="h-4 w-4 text-bonusly-green" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Given This Month</p>
                <p className="text-xl font-medium">95</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2">
              <div className="p-2 rounded-full bg-bonusly-blue/10">
                <Users className="h-4 w-4 text-bonusly-blue" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Team Bonuses</p>
                <p className="text-xl font-medium">47</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-2">
              <div className="p-2 rounded-full bg-bonusly-yellow/10">
                <Calendar className="h-4 w-4 text-bonusly-yellow" />
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Days Left</p>
                <p className="text-xl font-medium">26</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <div className="lg:col-span-2 space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <BarChart className="h-5 w-5" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <BonusFeed limit={3} />
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Star className="h-5 w-5" />
              Top Hashtags
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {["teamwork", "excellence", "innovation", "creativity", "respect"].map(tag => (
                <div 
                  key={tag}
                  className="px-3 py-2 bg-accent rounded-full flex items-center gap-2"
                >
                  <span className="font-medium text-sm">#{tag}</span>
                  <span className="text-xs bg-primary/10 text-primary px-1.5 py-0.5 rounded-full">
                    {Math.floor(Math.random() * 50) + 10}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
      
      <div className="space-y-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Users className="h-5 w-5" />
              Team
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {teamMembers.map(user => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50 cursor-pointer"
                onClick={() => onGiveBonus(user.id)}
              >
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.position}</p>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="h-7">
                  Give
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {users.sort((a, b) => b.points - a.points).slice(0, 3).map((user, index) => (
              <div 
                key={user.id} 
                className="flex items-center justify-between p-2 rounded-lg"
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-center w-6 h-6 rounded-full bg-accent">
                    <span className="text-xs font-medium">{index + 1}</span>
                  </div>
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} />
                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{user.name}</p>
                    <p className="text-xs text-muted-foreground">{user.points} points</p>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
