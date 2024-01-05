import { renderDescription } from "@/helpers/UIHelpers";
import { gray } from "@ant-design/colors";
import { Button, Flex, Typography } from "antd";
import { useEffect, useRef, useState } from "react";

export default function DescriptionBox({ Title, content }) {
  const splitContent = content ? content?.split("\n") : [];
  const firstLine = splitContent?.length > 0 ? splitContent[0] : "";

  const [isExpanded, setIsExpanded] = useState(false);
  const descriptionBoxRef = useRef(null);

  useEffect(() => {
    if (descriptionBoxRef.current) {
      // Scroll to the top of the DescriptionBox when it is collapsed
      descriptionBoxRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [isExpanded]);

  const onToggle = () => {
    setIsExpanded((prev) => !prev);
  };
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Flex
      vertical
      style={{
        borderRadius: 12,
        background: !isExpanded && isHovered ? gray[6] : gray[7],
        padding: 12,
        cursor: isExpanded ? "default" : "pointer",
        transition: "all 0.3s", // Add a transition for a smoother effect
      }}
      //   className="desc-box-hover-style"

      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      gap={8}
      ref={descriptionBoxRef}
      onClick={!isExpanded && onToggle}
    >
      {Title}

      <Flex vertical>
        <Typography.Text style={{ whiteSpace: "break-spaces" }}>
          {/* {content} */}
          {isExpanded
            ? renderDescription(content)
            : renderDescription(firstLine)}
        </Typography.Text>
        {splitContent?.length > 1 ? (
          <Button
            type="text"
            style={{
              maxWidth: "max-content",
              padding: "0 0.25em",
              fontWeight: "bold",
            }}
            onClick={onToggle}
          >
            {isExpanded ? "Show less" : "...more"}
          </Button>
        ) : null}
      </Flex>
    </Flex>
  );
}
