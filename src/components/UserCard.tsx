
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { User } from "@/data/mockData";

interface UserCardProps {
  user: User;
  onGiveBonus?: (userId: string) => void;
  compact?: boolean;
}

const UserCard = ({ user, onGiveBonus, compact = false }: UserCardProps) => {
  if (compact) {
    return (
      <div className="flex items-center gap-2 p-2 rounded-lg hover:bg-muted/50 cursor-pointer">
        <Avatar className="h-8 w-8">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <p className="text-sm font-medium">{user.name}</p>
          <p className="text-xs text-muted-foreground">{user.position}</p>
        </div>
      </div>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="h-12 bg-gradient-to-r from-bonusly-purple to-bonusly-lightPurple" />
      <CardContent className="pt-4">
        <div className="flex flex-col items-center">
          <Avatar className="h-16 w-16 -mt-12 border-4 border-background">
            <AvatarImage src={user.avatar} alt={user.name} />
            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
          </Avatar>
          
          <h3 className="mt-2 text-lg font-medium">{user.name}</h3>
          <p className="text-sm text-muted-foreground">{user.position}</p>
          <p className="text-xs text-muted-foreground">{user.department}</p>
          
          <div className="mt-3 w-full flex justify-between items-center">
            <div className="text-center">
              <p className="text-sm text-muted-foreground">Received</p>
              <p className="text-lg font-medium">{user.points} pts</p>
            </div>
            <div className="text-center">
              <p className="text-sm text-muted-foreground">To Give</p>
              <p className="text-lg font-medium">{user.pointsToGive} pts</p>
            </div>
          </div>
          
          {onGiveBonus && (
            <Button 
              onClick={() => onGiveBonus(user.id)}
              className="mt-4 w-full" 
              size="sm"
            >
              Give Bonus
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
