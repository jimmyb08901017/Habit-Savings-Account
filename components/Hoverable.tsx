import React, { useState } from "react";

import { Pressable } from "@gluestack-ui/themed";

const Hoverable = ({ children, ...props }: any) => {
  const [hover, setHover] = useState(false);
  return (
    <Pressable
      states={{
        hover,
      }}
      onHoverIn={() => setHover(true)}
      onHoverOut={() => setHover(false)}
      sx={{
        ":hover": {
          bg: "$backgroundDark300",
        },
      }}
      {...props}
    >
      {children}
    </Pressable>
  );
};
export { Hoverable };
