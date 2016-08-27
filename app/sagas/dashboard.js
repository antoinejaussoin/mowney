import { call, put, select } from 'redux-saga/effects';
import { fetchSummary, fetchSaving, fetchTimeline } from '../api/dashboard';
import { receiveSummary, receiveSavings, receiveTimeline } from '../state/dashboard';
import { getToken } from '../selectors/user';

export function* onGetSummary() {
    try {
        const token = yield select(getToken);
        const summary = yield call(fetchSummary, token, 'GBP');
        yield put(receiveSummary(summary));
    } catch (e) {
        console.error('Get Summary error: ', e);
    }
}

function* onGetSavings() {
    const savings = [
        { id: 'current-month', name: 'Current Month' },
        { id: 'last-month', name: 'Last Month' },
        { id: 'six-month', name: 'Six Months' },
        { id: 'one-year', name: 'One Year' },
        { id: 'three-years', name: 'Three Years' },
        { id: 'inception', name: 'Inception' }
    ];
    const token = yield select(getToken);
    const results = [];

    for (let i = 0; i < savings.length; i++) {
        const savingMeta = savings[i];
        const saving = yield call(fetchSaving, token, savingMeta.id, 'GBP');
        results.push({
            name: savingMeta.name,
            id: savingMeta.id,
            ...saving
        });
    }

    yield put(receiveSavings(results));
}

export function* onGetTimeline() {
    try {
        const token = yield select(getToken);
        const timeline = yield call(fetchTimeline, token, 'GBP');
        yield put(receiveTimeline(timeline));
    } catch (e) {
        console.error('Get Timeline error: ', e);
    }
}

export function* onLoadDashboard() {
    yield call(onGetSummary);
    yield call(onGetSavings);
    yield call(onGetTimeline);
}
