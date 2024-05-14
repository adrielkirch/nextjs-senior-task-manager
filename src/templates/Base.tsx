import { Meta } from '../layout/Meta';
import { AppConfig } from '../utils/AppConfig';
import { Banner } from './Banner';
import { Footer } from './Footer';
import { Hero } from './Hero';
import { Sponsors } from './Sponsors';
import { VerticalFeatures } from './VerticalFeatures';

const Base = () => (
  <div className="bg-primary-900 text-primary-900 antialiased">
    <Meta title={AppConfig.title} description={AppConfig.description} />
    <Hero />
    <Sponsors />
    <VerticalFeatures />
    <Banner />
    <Footer />
  </div>
);

export { Base };
