import { useEffect, useState, useMemo } from 'react';
import { getCountyList } from 'pages/T00700_BasicInformation/api';

export const useLocationOptions = (watchedCountyName) => {
  const [locationLists, setLocationLists] = useState([]);

  // 縣市選單
  const countyOptions = useMemo(() => {
    if (locationLists.length) {
      return locationLists.map(({ countyName }) => ({
        label: countyName,
        value: countyName,
      }));
    }
    return [];
  }, [locationLists]);

  // 建立鄉鎮市區選單
  const districtOptions = useMemo(() => {
    const foundDistrictOption = locationLists.find(
      ({ countyName }) => countyName === watchedCountyName,
    );
    if (foundDistrictOption) {
      return foundDistrictOption.cities.map(({ cityName }) => ({
        label: cityName,
        value: cityName,
      }));
    }
    return [];
  }, [watchedCountyName, locationLists]);

  useEffect(async () => {
    // TODO 可能需要加入 dispatch(setWaittingVisible(true/false))

    const { code, data } = await getCountyList({});
    if (code === '0000') {
      setLocationLists(data);
    }
  }, []);

  return {
    countyOptions,
    districtOptions,
  };
};
