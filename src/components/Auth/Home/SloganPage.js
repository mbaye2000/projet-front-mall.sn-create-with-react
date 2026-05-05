import Carousel from "react-bootstrap/Carousel";

function SloganPage() {
  return (
    <Carousel data-bs-theme="dark">
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "700px" }}
          src="https://www.kahpoo.com/user-photos//7871d37a-7df9-46f3-be8c-2b59b9fb821023032026145320.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "600px" }}
          src="https://www.kahpoo.com/user-photos//cfd47ba4-9bed-4231-8d29-cc5e4e2f9ed524032026144018.png"
          alt="Second slide"
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          style={{ height: "600px" }}
          src="https://www.kahpoo.com/user-photos//f427042e-40dd-4109-9cc2-e3aca14d9a9026032026143525.jpeg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default SloganPage;
