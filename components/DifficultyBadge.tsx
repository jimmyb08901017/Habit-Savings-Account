import { Badge, BadgeIcon, BadgeText } from "@gluestack-ui/themed";
import { GlobeIcon } from "@gluestack-ui/themed";

type DifficuityBadgeProps = {
  level: string;
};

export default function DifficuityBadge({ level }: DifficuityBadgeProps) {
  let action: any = "success";
  let text = "";
  let cost = 0;
  switch (level) {
    case "0":
      action = "success";
      text = "easy";
      cost = 5;
      break;
    case "1":
      action = "warning";
      text = "medium";
      cost = 10;
      break;
    case "2":
      action = "error";
      text = "hard";
      cost = 15;
      break;
    default:
      action = "muted";
      text = "Unused";
      cost = 0;
      break;
  }

  return (
    <Badge size="md" variant="solid" borderRadius="$xs" action={action}>
      <BadgeText>
        {text} +{cost}$
      </BadgeText>
      {/* <BadgeIcon as={GlobeIcon} ml="$2" /> */}
    </Badge>
  );
}
