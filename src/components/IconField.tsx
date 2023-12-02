import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import type { FontAwesomeIconProps } from "@fortawesome/react-fontawesome"
import { Box, Typography, TypographyOwnProps, styled } from "@mui/material"
import { FC, ReactNode } from "react"

const IconFieldContainer = styled(Box)({
  display: "flex",
  flexDirection: "row-reverse",
  alignItems: "center",
})

const StyledIcon = styled(FontAwesomeIcon)({
  padding: 8,
})

type Props = {
  children: ReactNode
  icon: FontAwesomeIconProps["icon"]
  typographyVariant?: TypographyOwnProps["variant"]
  iconSize?: FontAwesomeIconProps["size"]
}

const IconField: FC<Props> = ({
  children,
  icon,
  typographyVariant: variant,
  iconSize,
}) => {
  if (!children) return null
  return (
    <IconFieldContainer>
      <Typography variant={variant}>{children}</Typography>
      <StyledIcon icon={icon} size={iconSize} />
    </IconFieldContainer>
  )
}
export default IconField
