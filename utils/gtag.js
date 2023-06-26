import ReactGA from 'react-ga';

export const GA_TRACKING_ID = "G-VSXF2DEWSQ"

export const initGA = () => {
    ReactGA.initialize(GA_TRACKING_ID);
};


export const logPageView = () => {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
};


export const logEvent = (category, action, label = '', value = 0) => {
    ReactGA.event({
        category: category,
        action: action,
        label: label,
        value: value,
    });
};
