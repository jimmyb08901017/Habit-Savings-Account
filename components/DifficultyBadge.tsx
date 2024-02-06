import { Badge, BadgeIcon, BadgeText } from "@gluestack-ui/themed";
import { GlobeIcon } from "@gluestack-ui/themed";

type DifficuityBadgeProps = {
  level: number;
}

export default function DifficuityBadge({level}: DifficuityBadgeProps) {
  let action: any = "success";
  let text = ""
  switch (level) {
    case 0: action="success"; text="easy"; break;
    case 1: action="warning"; text="medium"; break;
    case 2: action="error"; text="hard"; break;
    default: action="muted"; text="Unused"; break;
  } 

  return (
    <Badge size="md" variant="solid" borderRadius="$xs" action={action}>
      <BadgeText>{text}</BadgeText>
      {/* <BadgeIcon as={GlobeIcon} ml="$2" /> */}
    </Badge>
  )
}