import React from "react";
import Banner from '../../media/banner/Banner';
import Headers from "../../media/headers/Headers";
import NewUsers from '../../user/new_users/NewUsers';
import Gallery from '../../media/gallery/Gallery';
import Footer from "../footer/Footer";

function Home()
{
    return (
        <section>
            <Banner/>
            <section className={`sectionSpace`}>
                <Headers title={`best singers`}/>
                <NewUsers />
            </section>
            <section className={`sectionSpace`}>
                <Headers title={`gallery`}/>
                <Gallery />
            </section>
            <Footer />
        </section>
    );
}

export default Home;
