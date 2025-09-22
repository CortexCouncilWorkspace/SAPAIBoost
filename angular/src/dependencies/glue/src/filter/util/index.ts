interface FilterData {
  strategy?: string;
  [propName: string]: FilterGroup | string | undefined;
}

type FilterGroup = Record<string, boolean>;

type FilterTarget = Record<string, string[]>;

type FilterMatchFunc = (
  filter: FilterData,
  key: string,
  value: string,
) => boolean;

/**
 * Returns matching results for a list of data.
 *
 *  The first argument is targetArray which includes a list of targets.
 *  Each target is an object which represents a filter category and
 *  possible values.
 *  Example:
 *  targetArray: Target[] = [
 *    {
 *      'color': ['green', 'red'],
 *      'type': ['fruit'],
 *    },
 *    {
 *      'color': ['yellow'],
 *      'type': ['vegetable'],
 *    }
 *  ]
 *
 *  The second parameter is a filter object, which represents the matching
 *  criteria used to evaluate the list of items.
 *  Example:
 *  filter: Filter = {
 *    'type': {
 *      'vegetable': true,
 *      'fruit': false,
 *    },
 *    'color': {
 *      'red': true,
 *      'orange': true,
 *      'yellow': false,
 *      'green': false
 *    }
 *  }
 *  The output is an array of boolean values, they represent whether the
 *  corresponding items are matched. Example: [true,true,false].
 * @param targetArr The target data object to filter
 * @param filter The filter object with stategy and filters.
 * @param matchFunc An optional function to use for matching.
 * @return The result showing whether the data matches the filter.
 */
function filterlist(
  targetArr: FilterTarget[],
  filter: FilterData,
  matchFunc?: FilterMatchFunc,
): boolean[] {
  const output: boolean[] = [];
  targetArr.forEach((target) => {
    const filtered: boolean = filterData(target, filter, matchFunc);
    output.push(filtered);
  });
  return output;
}

/**
 * Returns matching result for a single data based on the filter.
 * @return Shows whether the data matches the filter.
 */
function filterData(
  target: FilterTarget,
  filter: FilterData,
  matchFunc?: FilterMatchFunc,
): boolean {
  let isMatch = false;

  // Set a default filter strategy to 'strict'
  if (
    filter.strategy === undefined ||
    !['strict', 'loose'].includes(filter.strategy)
  ) {
    filter.strategy = 'strict';
  }

  for (const key of Object.keys(target)) {
    isMatch = false;
    // Ignores the filter if the filter is inactive. The filter is inactive
    // if all filter options are false.
    if (!checkActiveState(filter, key) || filter[key] === undefined) {
      isMatch = true;
    } else {
      for (const value of target[key]) {
        const filterGroup = filter[key];
        let matchResult = false;
        if (matchFunc) {
          matchResult = matchFunc.call(undefined, filter, key, value);
        } else if (typeof filterGroup === 'object') {
          matchResult = filterGroup[value];
        }
        if (matchResult === true) {
          isMatch = true;
          break;
        }
      }
    }
    if ((filter.strategy === 'strict') === isMatch) {
      continue;
    } else {
      return isMatch;
    }
  }
  return isMatch;
}

/**
 * Checks whether the filter is active. Returns true if users have
 * changed the filter value.
 * @param filter The object includes all filters.
 * @param filterId The id of the filter item.
 * @return If the state is active.
 */
function checkActiveState(filter: FilterData, filterId: string): boolean {
  const item = filter[filterId];
  if (typeof item === 'object') {
    for (const filterOption in item) {
      if (item[filterOption]) return true;
    }
  }
  if (typeof item === 'string' && item.length > 0) {
    return true;
  }
  return false;
}

export {
  filterlist,
  type FilterData,
  type FilterGroup,
  type FilterMatchFunc,
  type FilterTarget,
};
