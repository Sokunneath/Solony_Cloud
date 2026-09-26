import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="about-page">
            <section className="about-intro">
                <span>ABOUT SOLONY</span>

                <h1>
                    small stationery.
                    <br />
                    <em>
                        softer everyday moments.
                    </em>
                </h1>

                <p>
                    Solony is a cozy stationery
                    space created for people who
                    enjoy writing, studying,
                    planning and creating at their
                    own pace.
                </p>
            </section>

            <section className="about-values">
                <div>
                    <span>01</span>

                    <h3>simple</h3>

                    <p>
                        Stationery that feels calm,
                        useful and easy to enjoy.
                    </p>
                </div>

                <div>
                    <span>02</span>

                    <h3>thoughtful</h3>

                    <p>
                        Little tools for everyday
                        moments and bigger ideas.
                    </p>
                </div>

                <div>
                    <span>03</span>

                    <h3>creative</h3>

                    <p>
                        Made for writing, drawing,
                        planning and exploring.
                    </p>
                </div>
            </section>

            <section className="about-cta">
                <h2>
                    find your next
                    <em> little favorite.</em>
                </h2>

                <Link
                    to="/shop"
                    className="final-button"
                >
                    shop solony

                    <ArrowRight size={17} />
                </Link>
            </section>
        </main>
    );
}