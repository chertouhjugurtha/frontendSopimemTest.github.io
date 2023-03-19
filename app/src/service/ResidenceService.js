export default class ResidenceService {

    getResidences() {
        return fetch('../data/appartement.json').then(res => res.json()).then(d => d.data);
    }
}