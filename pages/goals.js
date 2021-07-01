import { useQuery } from "@apollo/react-hooks";
import { useRouter } from "next/router";
import { gql } from "apollo-boost";

import {
  Button,
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Col,
  Row,
} from "reactstrap";

const GET_GOALS_INDICATORS = gql`
  query($id: ID!) {
    goal(id: $id) {
      id
      name
      indicators {
        id
        name
        description
        image {
          url
        }
      }
    }
  }
`;

function goals(props) {
  const router = useRouter();
  const { loading, error, data } = useQuery(GET_GOALS_INDICATORS, {
    variables: { id: router.query.id },
  });

  if (error) return "Error Loading indicators";
  if (loading) return <h1>Loading ...</h1>;
  if (data.goal) {
    const { goal } = data;
    return (
      <>
        <h1>{goal.name}</h1>
        <Row>
          {goal.indicators.map((res) => (
            <Col xs="6" sm="4" style={{ padding: 0 }} key={res.id}>
              <Card style={{ margin: "0 10px" }}>
                <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                />
                <CardBody>
                  <CardTitle><b>{res.name}</b></CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                
              </Card>
            </Col>
          ))}
        </Row>
      </>
    );
  }
  return <h1>Add indicators</h1>;
}
export default goals;