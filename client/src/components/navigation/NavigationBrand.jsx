import { Trans } from "react-i18next";

function NavigationBrand() {
  return (
    <a className="navigation__brand" href="#hero">
      <Trans i18nKey="navigation.brand" components={{ highlight: <span /> }} />
    </a>
  );
}

export default NavigationBrand;
