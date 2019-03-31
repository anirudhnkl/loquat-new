import React, { Component } from "react";
import { Button, ButtonToolbar, Col, Container, Row, /*Button*/ } from "react-bootstrap";
import Portfolio from "../components/Portfolio/Portfolio";

import "./Group.css";

class Group extends Component {
    constructor(props) {
        super(props)
        
        this.state = {
          stocks: [],
          members: [],
          pending_trades: []
        }
    }


    render() {
        return (
        <div className="Group">
            <Container>
                <Row>
                    <h1>GID: {this.props.groupId}</h1>
                </Row>
                <Row>
                    <Col md="auto">
                        <Portfolio {...this.props} stocks={this.state.stocks} />
                    </Col>
                </Row>
                <Row>
                    <Col md="auto">
                        <div className="Members">
                        <h2>Members</h2>
                        <hr />
                        {this.state.members.map(member => (
                            <div className="container" key={member.id}>
                                <ButtonToolbar>
                                    <div className="col-sm">
                                    <p className="name">Name: {member.name}</p>
                                    </div>
                                    <div className="col-sm">
                                    <Button variant="info" className="btn btn-primary amt" disabled>{member.amt}</Button>
                                    </div>
                                </ButtonToolbar>
                            </div>
                        ))}
                        </div>
                    </Col>
                </Row>
                {/* <Row>
                    <Col md="auto">
                        <GroupCards {...this.props} groups={this.state.groups} />
                    </Col>
                </Row> */}
            </Container>
        </div>
        );
    }
}

export default Group;
