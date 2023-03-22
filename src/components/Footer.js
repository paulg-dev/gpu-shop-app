
import { faFacebook, faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Row, Col } from 'react-bootstrap';
import '../css/Footer.css'

export default function Footer() {

	return (

		<div className="footer-container">
			<div className="footer-div text-center py-5 mt-5">
				<Row>
					<Col sm={10} md={4} className="d-flex flex-column align-items-center mx-auto py-1">
						<h5 className="footer-headers"><strong>Forums</strong></h5>
							<ul>
								<li><a href="https://linustechtips.com/" className="footer-links">Linus Tech Tips</a></li>
								<li><a href="https://www.reddit.com/r/gpu/" className="footer-links">Reddit</a></li>
							</ul>
					</Col>
					<Col sm={10} md={8} className="mx-auto py-1">
						<Row>
							<Col xs={6} sm={6} md={4} className="d-flex flex-column align-items-center mx-auto">
								<h5 className="footer-headers"><strong>Partners</strong></h5>
								<ul>
									<li><a href="https://dynaquestpc.com/" className="footer-links">Dynaquest</a></li>
									<li><a href="https://www.pchubonline.com/" className="footer-links">PCHub</a></li>
									<li><a href="https://pcx.com.ph/" className="footer-links">PCExpress</a></li>
								</ul>
							</Col>
							<Col xs={6} sm={6} md={4} className="d-flex flex-column align-items-center mx-auto">
								<h5 className="footer-headers"><strong>Downloads</strong></h5>
								<ul>
									<li><a href="https://www.nvidia.com/download/index.aspx" className="footer-links">Nvidia</a></li>
									<li><a href="https://www.amd.com/en/support" className="footer-links">Amd</a></li>
									<li><a href="https://www.intel.com/content/www/us/en/download-center/home.html" className="footer-links">Intel</a></li>
								</ul>
							</Col>
						</Row>
					</Col>
				</Row>
				<hr className="footer-line" />
				<Row>
					<Col sm={12} md={6} className="d-flex px-2 my-auto justify-content-center">
						Copyright &copy; 2023 Paul Santos
					</Col>
					<Col sm={12} md={6} className="d-flex px-2 my-auto justify-content-center">
						<a href="https://web.facebook.com/paul.guzon3/" className="footer-links">
							<FontAwesomeIcon className="footer-socials" icon={faFacebook} size="3x"/>
						</a> &nbsp;
						<a href="https://www.linkedin.com/in/paulguzon3/" className="footer-links">
							<FontAwesomeIcon className="footer-socials" icon={faLinkedin} size="3x"/>
						</a> &nbsp;
						<a href="https://paulg-dev.github.io/portfolio/" className="footer-links">
							<FontAwesomeIcon className="footer-socials" icon={faGithub} size="3x"/>
						</a>
					</Col>
				</Row>
				<p className="text-center text-muted">
					Disclaimer: This site is made for showcase purposes only and not an actual shop. All product images and names that are used for item identification are trademarks of each respective manufacturer.
				</p>
			</div>
		</div>

	)
}