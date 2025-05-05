
import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { companyValues, users } from "@/data/mockData";
import { useToast } from "@/hooks/use-toast";

interface GiveBonus {
  receiver: string;
  amount: number;
  message: string;
  hashtags: string[];
}

const GiveBonus = () => {
  const { toast } = useToast();
  const [bonus, setBonus] = useState<GiveBonus>({
    receiver: "",
    amount: 5,
    message: "",
    hashtags: [],
  });
  const [hashtag, setHashtag] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [showPopover, setShowPopover] = useState(false);
  
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form
    if (!bonus.receiver) {
      toast({ 
        title: "Select a team member", 
        description: "Please select someone to give a bonus to.",
        variant: "destructive" 
      });
      return;
    }
    
    if (bonus.message.length < 5) {
      toast({ 
        title: "Message too short", 
        description: "Please write a more detailed message (min 5 characters).",
        variant: "destructive" 
      });
      return;
    }
    
    // Submit bonus
    toast({ 
      title: "Bonus sent!", 
      description: `You gave ${users.find(u => u.id === bonus.receiver)?.name} ${bonus.amount} points.` 
    });
    
    // Reset form
    setBonus({
      receiver: "",
      amount: 5,
      message: "",
      hashtags: [],
    });
  };
  
  const addHashtag = () => {
    if (hashtag && !bonus.hashtags.includes(hashtag)) {
      setBonus({...bonus, hashtags: [...bonus.hashtags, hashtag]});
      setHashtag("");
    }
  };
  
  const removeHashtag = (tag: string) => {
    setBonus({
      ...bonus, 
      hashtags: bonus.hashtags.filter(t => t !== tag)
    });
  };
  
  const selectUser = (userId: string) => {
    setBonus({...bonus, receiver: userId});
    setSearchTerm(users.find(u => u.id === userId)?.name || "");
    setShowPopover(false);
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-lg">Give a Bonus</CardTitle>
        <CardDescription>Recognize a team member for their great work!</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="receiver">To</Label>
              <Popover open={showPopover} onOpenChange={setShowPopover}>
                <PopoverTrigger asChild>
                  <div className="relative">
                    <Input
                      id="receiver"
                      placeholder="Search for a team member"
                      value={searchTerm}
                      onChange={(e) => {
                        setSearchTerm(e.target.value);
                        setShowPopover(true);
                      }}
                      onFocus={() => setShowPopover(true)}
                      className="w-full"
                    />
                    {bonus.receiver && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="absolute right-2 top-1/2 -translate-y-1/2"
                        onClick={() => {
                          setBonus({...bonus, receiver: ""});
                          setSearchTerm("");
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </PopoverTrigger>
                <PopoverContent className="w-[300px] p-0" align="start">
                  <div className="max-h-[200px] overflow-y-auto">
                    {filteredUsers.length > 0 ? (
                      filteredUsers.map(user => (
                        <div
                          key={user.id}
                          className="flex items-center gap-2 p-2 hover:bg-secondary cursor-pointer"
                          onClick={() => selectUser(user.id)}
                        >
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.avatar} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <p className="text-sm font-medium">{user.name}</p>
                            <p className="text-xs text-muted-foreground">{user.position}</p>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="p-2 text-sm text-muted-foreground">No team members found</p>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="amount">Points</Label>
              <Select 
                value={String(bonus.amount)} 
                onValueChange={(val) => setBonus({...bonus, amount: parseInt(val)})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select amount" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Points</SelectLabel>
                    {[5, 10, 15, 20, 25, 50].map(amount => (
                      <SelectItem key={amount} value={String(amount)}>
                        {amount} points
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Why are you giving this bonus?"
                value={bonus.message}
                onChange={(e) => setBonus({...bonus, message: e.target.value})}
                className="min-h-[100px]"
              />
            </div>
            
            <div className="space-y-2">
              <Label>Values</Label>
              <div className="flex flex-wrap gap-2">
                {bonus.hashtags.map(tag => (
                  <div 
                    key={tag} 
                    className="flex items-center gap-1 px-3 py-1 bg-accent rounded-full"
                  >
                    <span className="text-sm">#{tag}</span>
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-4 w-4 rounded-full"
                      onClick={() => removeHashtag(tag)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                ))}
              </div>
              
              <div className="flex gap-2">
                <Select onValueChange={setHashtag}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select a company value" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Company Values</SelectLabel>
                      {companyValues.map(value => (
                        <SelectItem key={value} value={value}>
                          #{value}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                
                <Button 
                  type="button" 
                  size="icon" 
                  variant="outline"
                  onClick={addHashtag} 
                  disabled={!hashtag}
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-end">
        <Button onClick={handleSubmit}>Give Bonus</Button>
      </CardFooter>
    </Card>
  );
};

export default GiveBonus;
