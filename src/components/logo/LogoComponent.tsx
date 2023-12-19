import "./LogoComponent.css";

const logoPath = "../../../public/images/karma_logo.png";

const LogoComponent = () => {
  return <img className="logo-img" src={logoPath} alt="Karma logo" />;
};

export default LogoComponent;
