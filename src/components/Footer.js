
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import '../css/Footer.css'

export default function Footer() {

	return (

		<div className="footerContainer">
			<div className="footerDiv text-center py-5 mt-5">
				<Row>
					<Col sm={10} md={4} className="d-flex flex-column align-items-center mx-auto py-1">
						<h4 className="footerHeader"><strong>Downloads</strong></h4>
						{/*<hr className="foooterLinksLine"/>*/}
						<ul>
							<li><a href="https://www.nvidia.com/download/index.aspx" className="footerLinks">Nvidia</a></li>
							<li><a href="https://www.amd.com/en/support" className="footerLinks">Amd</a></li>
							<li><a href="https://www.intel.com/content/www/us/en/download-center/home.html" className="footerLinks">Intel</a></li>
						</ul>
					</Col>
					<Col sm={10} md={4} className="d-flex flex-column align-items-center mx-auto py-1">
						<h4 className="footerHeader"><strong>Partner Shops</strong></h4>
						{/*<hr className="foooterLinksLine"/>*/}
						<ul>
							<li><a href="https://dynaquestpc.com/" className="footerLinks">Dynaquest</a></li>
							<li><a href="https://www.pchubonline.com/" className="footerLinks">PCHub</a></li>
							<li><a href="https://pcx.com.ph/" className="footerLinks">PCExpress</a></li>
						</ul>
					</Col>
					<Col sm={10} md={4} className="d-flex flex-column align-items-center mx-auto py-1">
						<h4 className="footerHeader"><strong>Forums</strong></h4>
						{/*<hr className="foooterLinksLine"/>*/}
						<ul>
							<li><a href="https://linustechtips.com/" className="footerLinks">Linus Tech Tips</a></li>
							<li><a href="https://www.reddit.com/r/gpu/" className="footerLinks">Reddit</a></li>
						</ul>
					</Col>
				</Row>
				<hr className="footerLine" />
				<Row>
					<Col sm={12} md={6} className="d-flex px-2 my-auto justify-content-center">
						Copyright &copy; 2023 Paul Santos
					</Col>
					<Col sm={12} md={6} className="d-flex px-2 my-auto justify-content-center">
						<a href="https://web.facebook.com/paul.guzon3/" className="footerLinks">
							<FontAwesomeIcon className="footerSocials" icon={faFacebook} size="3x"/>
						</a> &nbsp;
						<a href="https://www.linkedin.com/in/paulguzon3/" className="footerLinks">
							<FontAwesomeIcon className="footerSocials" icon={faLinkedin} size="3x"/>
						</a> &nbsp;
						<a href="https://paulg-dev.github.io/portfoliov2/" className="footerLinks">
							<FontAwesomeIcon className="footerSocials" icon={faGithub} size="3x"/>
						</a>
					</Col>
				</Row>
			</div>
		</div>

	)
}