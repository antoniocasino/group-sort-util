import moment from "moment";
import _ from 'lodash';

export const temporalUnit = { DAY: "YYYY-MM-DD", HOUR: "YYYY-MM-DD HH", MINUTE: "YYYY-MM-DD HH mm", SECOND: "YYYY-MM-DD HH mm ss" };
export const sortOrder = { ascending: "asc", descending: "desc" };
export const finalElementSchema = { group: "string", entries: [], temporal_unit: "string" };

export function groupAndTemporalSort(
    { collection,
        unit = temporalUnit.DAY,
        temporalOrder = sortOrder.descending,
        temporalPropertyName,
        groupPropertyName,
        groupOrder = sortOrder.ascending
    }) {

    if (!collection || collection.length == 0) {
        throw ("please specify a not empty collection");
    }
    if (!groupPropertyName) {
        throw ("please specify group property name");
    }
    if (!collection.every(object => object.hasOwnProperty(groupPropertyName))) {
        throw (`${groupPropertyName} should be defined for all elements`);
    }
    let groupedElements;

    if (!temporalPropertyName) {
        throw ("please specify temporal property name");
    }
    if (!collection.every(object => object.hasOwnProperty(temporalPropertyName))) {
        throw (`${temporalPropertyName} should be defined for all elements`);
    }
    let temporalSortedCollection = collection.map(h => ({ ...h, temporal_unit_time: moment(h[temporalPropertyName]).format(unit) }));
    let groupedData = _.groupBy(temporalSortedCollection, (h) => h[groupPropertyName]);
    groupedElements = Object.entries(groupedData)
        .map(value => {
            if (value.length > 1) {
                return {
                    group: value[0],
                    entries: _.groupBy(value[1], (el) => {
                        return el.temporal_unit_time;
                    })
                };
            }
        })
        .map(n => {
            return Object.entries(n.entries).map(value => {
                if (value.length > 1) {
                    return { groupBy: n.group, entries: value[1], temporal_unit_time: value[0] };
                }
            });
        })
        .flatMap(n => n)
        .filter(n => n)
        .sort((a, b) => {
            if (a[temporalPropertyName] > b.temporal_unit_time) return order == temporalOrder.descending ? -1 : 1;
            if (a[temporalPropertyName] < b.temporal_unit_time) return order == temporalOrder.descending ? 1 : -1;
            if (a[groupPropertyName] > b[groupPropertyName]) return groupOrder == sortOrder.ascending ? 1 : -1;
            if (a[groupPropertyName] < b[groupPropertyName]) return groupOrder == sortOrder.ascending ? -1 : 1;
        });

    return groupedElements;
}
