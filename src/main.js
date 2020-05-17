import {Menu as MenuComponent, MenuItem} from "@/components/menu.js";
import {InfoWrapper as InfoWrapperComponent} from "@/components/infoWrapper.js";
import {render, RenderPosition} from "@/utils/render.js";
import {TripController} from "@/controllers/board.js";
import {FilterController} from "@/controllers/filter.js";
import {CostController} from "@/controllers/cost.js";
import {InfoController} from "@/controllers/info.js";
import {Points as PointsModel} from "@/models/points.js";
import {Statistic as StatisticComponent} from "@/components/statistics.js";
import API from "@/API/api.js";
import OffersModel from "@/models/offers.js";
import DestinationModel from "@/models/destinations.js";

const AUTHORIZATION = `Basic fdsOQml1Ck16zo2`;
const END_POINT = `https://11.ecmascript.pages.academy/big-trip`;

const api = new API(END_POINT, AUTHORIZATION);
const offersModel = new OffersModel();
const destinationModel = new DestinationModel();
const pointsModel = new PointsModel();

const siteMainElement = document.querySelector(`.trip-main`);
const infoWrapperComponent = new InfoWrapperComponent();

render(siteMainElement, infoWrapperComponent, RenderPosition.AFTERBEGIN);

const infoWrapper = document.querySelector(`.trip-info`);

const infoController = new InfoController(infoWrapper, pointsModel);

const costController = new CostController(infoWrapper, pointsModel);

const siteControls = siteMainElement.querySelector(`.trip-controls`);
const siteMenu = siteControls.querySelector(`h2:nth-child(1)`);
const siteFilter = siteControls.querySelector(`h2:nth-child(2)`);

const menuComponent = new MenuComponent();

render(siteMenu, menuComponent, RenderPosition.AFTEREND);
const filterController = new FilterController(siteFilter, pointsModel);
filterController.render();

const siteBoardEvents = document.querySelector(`.trip-events`);
const boardController = new TripController(siteBoardEvents, pointsModel, offersModel, destinationModel, api);

const statistics = new StatisticComponent(pointsModel);
render(siteBoardEvents, statistics, RenderPosition.AFTEREND);
statistics.hide();

menuComponent.setOnChange((menuItem) => {
  switch (menuItem) {
    case MenuItem.NEW_EVENT:
      menuComponent.setActiveItem(MenuItem.NEW_EVENT);
      boardController.showBlock();
      statistics.hide();
      boardController.createEvent();
      break;
    case MenuItem.STATISTICS:
      menuComponent.setActiveItem(MenuItem.STATISTICS);
      boardController.hideBlock();
      statistics.show();
      break;
    case MenuItem.EVENTS:
      menuComponent.setActiveItem(MenuItem.EVENTS);
      statistics.hide();
      boardController.showBlock();
  }
});

Promise.all([api.getOffers(), api.getDestinations(), api.getPoints()])
.then(([offers, destinations, events]) => {
  offersModel.setOffers(offers);
  destinationModel.setDestinations(destinations);
  pointsModel.setPoints(events);
  infoController.render();
  costController.render();
  boardController.render();
})
.catch();
