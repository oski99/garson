import { createSelector } from "reselect";

const selectMenu = (state) => state.menu;

export const selectMenuData = createSelector([selectMenu], (menu) =>
  menu.menu ? Object.keys(menu.menu).map((key) => menu.menu[key]) : []
);

export const selectMenuPositions = createSelector([selectMenu], (menu) =>
  menu.menu
    ? Object.keys(menu.menu)
        .map((key) => menu.menu[key])
        .map((section) => {
          return section.items;
        })
        .flat()
    : []
);

export const selectIsPopUpOn = createSelector(
  [selectMenu],
  (menu) => menu.popUpOn
);
