import { delay } from 'redux-saga'
import { takeLatest, put, call } from "redux-saga/effects";
import axios from "axios";

const fetchData = (id) => (
  axios({
    method: 'get',
    url: `https://api.coinmarketcap.com/v1/ticker/${id}/`
  })
);

export function* addCategoryAsync(action) {
  yield delay(1000);
  yield put({
    type: 'ADD_CATEGORY',
    id: action.id,
    title: action.title,
  });
}

export function* workerWithAPI(action) {
  try {
    const response = yield call(fetchData.bind(this, action.id));
    const moneyData = {
      data: response.data[0],
      categoryId: action.categoryId,
    };

    // dispatch a success action to the store with the new dog
    yield put({ type: "API_CALL_SUCCESS", ...moneyData });

  } catch (error) {
    // dispatch a failure action to the store with the error
    console.log('ERROR-->', error);
    yield put({ type: "API_CALL_FAILURE", error });
  }
}

export default function* rootSaga() {
  yield takeLatest('ADD_CATEGORY_2', addCategoryAsync);
  yield takeLatest('LOAD_DATA_REQUEST', workerWithAPI);
}