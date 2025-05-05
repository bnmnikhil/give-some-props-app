
import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Bonus, bonuses, getUserById, formatTimeAgo } from "@/data/mockData";

interface BonusFeedProps {
  limit?: number;
}

const BonusFeed = ({ limit }: BonusFeedProps) => {
  const [feedItems, setFeedItems] = useState<Bonus[]>([]);
  
  useEffect(() => {
    // Sort bonuses by timestamp, most recent first
    const sortedBonuses = [...bonuses].sort((a, b) => 
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
    
    if (limit) {
      setFeedItems(sortedBonuses.slice(0, limit));
    } else {
      setFeedItems(sortedBonuses);
    }
  }, [limit]);
  
  const formatBonusMessage = (message: string) => {
    // Format hashtags
    let formattedMessage = message.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
    return formattedMessage;
  };

  return (
    <div className="space-y-4">
      {feedItems.map(bonus => {
        const sender = getUserById(bonus.senderId);
        const receiver = getUserById(bonus.receiverId);
        
        if (!sender || !receiver) return null;
        
        return (
          <Card key={bonus.id} className="overflow-hidden animate-fade-in">
            <CardHeader className="bg-secondary/50 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={sender.avatar} alt={sender.name} />
                    <AvatarFallback>{sender.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">{sender.name}</p>
                    <p className="text-xs text-muted-foreground">{sender.position}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="font-medium text-bonusly-green">
                    +{bonus.amount}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">points</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="py-3">
              <div className="flex items-start gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={receiver.avatar} alt={receiver.name} />
                  <AvatarFallback>{receiver.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <p className="text-sm">
                    <span className="font-medium">{receiver.name}</span>
                    <span className="text-xs text-muted-foreground ml-1">received bonus</span>
                  </p>
                  <p className="text-sm mt-1" dangerouslySetInnerHTML={{ __html: formatBonusMessage(bonus.message) }} />
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(bonus.timestamp)}
                    </span>
                    <div className="flex gap-1">
                      {bonus.hashtags.map(tag => (
                        <span
                          key={tag}
                          className="text-xs px-2 py-1 bg-accent rounded-full text-accent-foreground"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default BonusFeed;
