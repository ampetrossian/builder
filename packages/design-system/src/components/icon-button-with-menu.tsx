import type { IconComponent } from "@webstudio-is/icons";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuPortal,
  DropdownMenuContent,
  DropdownMenuArrow,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
} from "./dropdown-menu";
import { Tooltip } from "./tooltip";
import { IconButton } from "./icon-button";
import { Flex } from "./flex";
import { theme } from "../stitches.config";

export const IconButtonWithMenu = ({
  variant,
  icon: Icon,
  label,
  value,
  items,
  onChange,
  onHover,
}: {
  variant: "default" | "preset" | "local" | "remote";
  icon?: JSX.Element;
  label?: string;
  value: string;
  items: Array<{
    label: string;
    name: string;
    icon?: ReturnType<IconComponent>;
  }>;
  onChange?: (value: string) => void;
  onHover?: (value: string) => void;
}) => {
  return (
    <DropdownMenu modal={false}>
      <Tooltip
        content={label}
        delayDuration={400}
        disableHoverableContent={true}
      >
        <DropdownMenuTrigger asChild>
          <IconButton variant={variant}>{Icon}</IconButton>
        </DropdownMenuTrigger>
      </Tooltip>
      <DropdownMenuPortal>
        <DropdownMenuContent sideOffset={4} collisionPadding={16} side="bottom">
          <DropdownMenuRadioGroup value={value} onValueChange={onChange}>
            {items.map(({ name, label, icon }) => {
              return (
                <DropdownMenuRadioItem
                  key={name}
                  value={label}
                  onFocus={() => onHover?.(name)}
                  onBlur={() => onHover?.(value)}
                >
                  <Flex
                    css={{
                      width: theme.spacing[11],
                      height: theme.spacing[11],
                    }}
                    align="center"
                    justify="center"
                  >
                    {icon}
                  </Flex>
                  {label}
                </DropdownMenuRadioItem>
              );
            })}
          </DropdownMenuRadioGroup>
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  );
};
