
export interface User {
  id: string;
  name: string;
  avatar: string;
  position: string;
  department: string;
  points: number;
  pointsToGive: number;
}

export interface Bonus {
  id: string;
  senderId: string;
  receiverId: string;
  amount: number;
  message: string;
  hashtags: string[];
  timestamp: string;
}

export const users: User[] = [
  {
    id: "user1",
    name: "Alex Johnson",
    avatar: "https://ui-avatars.com/api/?name=Alex+Johnson&background=8B5CF6&color=fff",
    position: "Senior Developer",
    department: "Engineering",
    points: 320,
    pointsToGive: 150,
  },
  {
    id: "user2",
    name: "Samantha Lee",
    avatar: "https://ui-avatars.com/api/?name=Samantha+Lee&background=10B981&color=fff",
    position: "Product Manager",
    department: "Product",
    points: 420,
    pointsToGive: 120,
  },
  {
    id: "user3",
    name: "Marcus Chen",
    avatar: "https://ui-avatars.com/api/?name=Marcus+Chen&background=3B82F6&color=fff",
    position: "UX Designer",
    department: "Design",
    points: 280,
    pointsToGive: 180,
  },
  {
    id: "user4",
    name: "Priya Patel",
    avatar: "https://ui-avatars.com/api/?name=Priya+Patel&background=FBBF24&color=333",
    position: "Marketing Specialist",
    department: "Marketing",
    points: 350,
    pointsToGive: 100,
  },
  {
    id: "user5",
    name: "James Wilson",
    avatar: "https://ui-avatars.com/api/?name=James+Wilson&background=EF4444&color=fff",
    position: "Customer Success",
    department: "Support",
    points: 300,
    pointsToGive: 170,
  }
];

export const bonuses: Bonus[] = [
  {
    id: "bonus1",
    senderId: "user2",
    receiverId: "user1",
    amount: 20,
    message: "Thanks for helping debug that critical issue yesterday! You saved the release. #teamwork #excellence",
    hashtags: ["teamwork", "excellence"],
    timestamp: "2025-05-04T14:30:00Z"
  },
  {
    id: "bonus2",
    senderId: "user1",
    receiverId: "user3",
    amount: 15,
    message: "The new dashboard design is amazing! So intuitive and clean. #creativity #impact",
    hashtags: ["creativity", "impact"],
    timestamp: "2025-05-04T11:15:00Z"
  },
  {
    id: "bonus3",
    senderId: "user4",
    receiverId: "user2",
    amount: 25,
    message: "Great job leading the product meeting and keeping everyone focused on our goals! #leadership",
    hashtags: ["leadership"],
    timestamp: "2025-05-03T16:45:00Z"
  },
  {
    id: "bonus4",
    senderId: "user3",
    receiverId: "user5",
    amount: 10,
    message: "Thanks for being so responsive to our customer's issues yesterday. #customerFirst #respect",
    hashtags: ["customerFirst", "respect"],
    timestamp: "2025-05-03T09:20:00Z"
  },
  {
    id: "bonus5",
    senderId: "user5",
    receiverId: "user4",
    amount: 15,
    message: "The new social media campaign is performing amazing! #results #creativity",
    hashtags: ["results", "creativity"],
    timestamp: "2025-05-02T13:10:00Z"
  }
];

export const companyValues = [
  "teamwork",
  "excellence",
  "innovation",
  "respect",
  "leadership",
  "impact",
  "customerFirst",
  "creativity",
  "results",
  "ownership"
];

// Helper functions
export function formatTimeAgo(dateString: string): string {
  const date = new Date(dateString);
  const now = new Date();
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);
  
  let interval = Math.floor(seconds / 31536000);
  if (interval >= 1) {
    return interval === 1 ? "1 year ago" : `${interval} years ago`;
  }
  
  interval = Math.floor(seconds / 2592000);
  if (interval >= 1) {
    return interval === 1 ? "1 month ago" : `${interval} months ago`;
  }
  
  interval = Math.floor(seconds / 86400);
  if (interval >= 1) {
    return interval === 1 ? "1 day ago" : `${interval} days ago`;
  }
  
  interval = Math.floor(seconds / 3600);
  if (interval >= 1) {
    return interval === 1 ? "1 hour ago" : `${interval} hours ago`;
  }
  
  interval = Math.floor(seconds / 60);
  if (interval >= 1) {
    return interval === 1 ? "1 minute ago" : `${interval} minutes ago`;
  }
  
  return seconds < 10 ? "just now" : `${seconds} seconds ago`;
}

export function getUserById(id: string): User | undefined {
  return users.find(user => user.id === id);
}

export function formatMessage(message: string): string {
  // Format hashtags
  let formattedMessage = message.replace(/#(\w+)/g, '<span class="hashtag">#$1</span>');
  
  // Format @mentions
  formattedMessage = formattedMessage.replace(/@(\w+)/g, '<span class="mention">@$1</span>');
  
  return formattedMessage;
}
