import {Info as InfoComponent} from "@/components/info.js";
import {Cost as CostComponent} from "@/components/cost.js";
import {Menu as MenuComponent, MenuItem} from "@/components/menu.js";
import {render, RenderPosition} from "@/utils/render.js";
import {TripController} from "@/controllers/board.js";
import {FilterController} from "@/controllers/filter.js";
import {generateTripPoints} from "@/mock/eventData.js";
import {Points as PointsModel} from "@/models/points.js";

const POINT_COUNT = 5;
const events = generateTripPoints(POINT_COUNT);
const pointsModel = new PointsModel();
pointsModel.setPoints(events);

const siteMainElement = document.querySelector(`.trip-main`);

render(siteMainElement, new InfoComponent(pointsModel), RenderPosition.AFTERBEGIN);

const siteInfoTrip = siteMainElement.querySelector(`.trip-info`);

render(siteInfoTrip, new CostComponent(pointsModel), RenderPosition.BEFOREEND);

const siteControls = siteMainElement.querySelector(`.trip-controls`);
const siteMenu = siteControls.querySelector(`h2:nth-child(1)`);
const siteFilter = siteControls.querySelector(`h2:nth-child(2)`);

const menuComponent = new MenuComponent();

render(siteMenu, menuComponent, RenderPosition.AFTEREND);
const filterController = new FilterController(siteFilter, pointsModel);
filterController.render();

const siteBoardEvents = document.querySelector(`.trip-events`);
const boardController = new TripController(siteBoardEvents, pointsModel);

boardController.render();


menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_EVENT:
      menuComponent.setActiveItem(MenuItem.NEW_EVENT);
      boardController.createEvent();
      break;
  }
});
