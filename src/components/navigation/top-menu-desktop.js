import React from "react";
import styled from "@emotion/styled";
import useGetTopMenuLinks from "../../hooks/useGetTopMenuLinks";
import processTopMenuItems from "./process-top-menu-items";

const TopMenu = styled.div`
  ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
  }

  ul ul {
    display: none;
  }
`;

/**
 * DesktopTop()
 * Component to render the top menu
 */
const DesktopTop = () => {
  const allLinks = useGetTopMenuLinks();
  const processedTopMenu = [];

  Object.values(allLinks).forEach(({ edges: items }) => {
    processedTopMenu.push(processTopMenuItems(items));
  });

  const topMenu = processedTopMenu;

  return (
    <TopMenu>
      <ul>{topMenu}</ul>
    </TopMenu>
  );
};

export default DesktopTop;
