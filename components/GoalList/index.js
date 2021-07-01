import { useQuery } from "@apollo/react-hooks";
import { gql } from "apollo-boost";

import Link from "next/link";

import {
  Card,
  CardBody,
  CardImg,
  CardText,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

const QUERY = gql`
  {
    goals {
      id
      name
      description
      image {
        url
      }
    }
  }
`;

function GoalList(props) {
  const { loading, error, data } = useQuery(QUERY);
  if (error) return "Error loading goals";
  //if goals are returned from the GraphQL query, run the filter query
  //and set equal to variable goalsearch
  if (loading) return <h1>Fetching</h1>;
  if (data.goals && data.goals.length) {
    //searchQuery
    const searchQuery = data.goals.filter((query) =>
      query.name.toLowerCase().includes(props.search)
    );
    if (searchQuery.length != 0) {
      return (
        <Row>
          {searchQuery.map((res) => (
            <Col xs="6" sm="4" key={res.id}>
              <Card style={{ margin: "0 0.5rem 20px 0.5rem" }}>
                
                
                <CardBody>
                  <CardTitle><b>{res.name}</b></CardTitle>
                  <CardText>{res.description}</CardText>
                </CardBody>
                <div className="card-footer">
                  <Link
                    as={`/goals/${res.id}`}
                    href={`/goals?id=${res.id}`}
                  >
                    <a className="btn">  <span>
                  <CardImg
                  top={true}
                  style={{ height: 250 }}
                  src={`${process.env.NEXT_PUBLIC_API_URL}${res.image.url}`}
                />
                  </span>
                  </a>
                  </Link>
                </div>
              </Card>
            </Col>
          ))}

          <style jsx global>
            {`
              a {
                color: white;
              }
              a:link {
                text-decoration: none;
                color: white;
              }
              span:hover {
                color: white;
                transition: transform .8s;
                  transform: scale(1.2);
              }
              a:hover {
                color: white;
                transition: transform .8s;
                  transform: scale(1.2);
              }
              .card-columns {
                column-count: 3;
              }
              
            `}
          </style>
        </Row>
      );
    } else {
      return <h1>No goals Found</h1>;
    }
  }
  return <h5>Add goals</h5>;
}
export default GoalList;