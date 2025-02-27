import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";

interface DashboardCardProps {
  cardName: string;
  number: number | string;
  content: string;
  link?: string;
}

const DashboardCard: React.FC<DashboardCardProps> = ({
  cardName,
  number,
  content,
  link,
}) => {
  return (
    <Link href={link ? link : ""}>
      <Card className="border border-accent hover:shadow-lg">
        <CardHeader>
          <CardTitle>{cardName}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-2xl font-bold">{number}</p>
          <p className="text-sm text-muted-foreground">{content}</p>
        </CardContent>
      </Card>
    </Link>
  );
};

export default DashboardCard;
