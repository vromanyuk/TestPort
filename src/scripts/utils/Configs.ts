import { Constants } from "./Constants";

export const shipConfig = {
  color: {
    red: Constants.RED_COLOR,
    green: Constants.GREEN_COLOR,
  },
  back: {
    with: Constants.SHIP_WITH_ALPHA,
    without: Constants.SHIP_WITHOUT_ALPHA,
  },
  width: Constants.SHIP_WIDTH,
  height: Constants.SHIP_HEIGHT,
  widthStroke: Constants.SHIP_WIDTH_STROKE,
  speed: Constants.SHIP_SPEED,
};

export const pierConfig = {
  color: Constants.YELLOW_COLOR,
  back: Constants.PIER_ALPHA,
  width: Constants.PIER_WIDTH,
  height: Constants.PIER_HEIGHT,
  widthStroke: Constants.PIER_WIDTH_STROKE,
};

export const breakwaterConfig = {
  color: Constants.YELLOW_COLOR,
  back: Constants.BREAKWATER_ALPHA,
  width: Constants.BREAKWATER_WIDTH,
  height: Constants.BREAKWATER_HEIGHT,
  widthStroke: Constants.BREAKWATER_WIDTH_STROKE,
};

export const gateConfig = {
  x: Constants.GATE_X,
  y: Constants.GATE_Y,
  width: Constants.GATE_WIDTH,
  height: Constants.GATE_HEIGHT,
}

export const positionBreakwaterTop = {
  x: Constants.POSITION_BREAKWATER_TOP_X,
  y: Constants.POSITION_BREAKWATER_TOP_Y,
};

export const positionBreakwaterBottom = {
  x: Constants.POSITION_BREAKWATER_BOTTOM_X,
  y: Constants.POSITION_BREAKWATER_BOTTOM_Y,
};

export const startShipPoint = {
  x: Constants.START_POINT_SHIP_X,
  y: Constants.START_POINT_SHIP_Y,
};

export const waitingPointFullShip = {
  x: Constants.POINT_FULL_SHIP_WAITING_X,
  y: Constants.POINT_FULL_SHIP_WAITING_Y,
};

export const waitingPointEmptyShip = {
  x: Constants.POINT_EMPTY_SHIP_WAITING_X,
  y: Constants.POINT_EMPTY_SHIP_WAITING_Y,
};
