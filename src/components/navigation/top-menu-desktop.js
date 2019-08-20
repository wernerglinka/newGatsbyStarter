import React from "react";
import styled from "@emotion/styled";
import uuid from "uuid/v4";
import useGetTopMenuLinks from "../../hooks/useGetTopMenuLinks";
import ProcessTopMenuItems from "./process-top-menu-items";

const TopMenu = styled.div`
  height: 100%;

  a {
    text-decoration: none;
  }

  > ul {
    list-style: none;
    display: flex;
    justify-content: flex-end;
    padding-right: 10px;

    > li {
      position: relative;
      padding: 20px;
    }
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
    processedTopMenu.push(items);
  });

  return (
    <TopMenu>
      <ul id="topMenu">
        {processedTopMenu.map(items => (
          <ProcessTopMenuItems key={uuid()} item={items} />
        ))}
      </ul>
    </TopMenu>
  );
};

export default DesktopTop;
