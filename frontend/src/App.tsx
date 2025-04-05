import React from "react";
import {GroupList} from "./features/groups/GroupList/GroupList";
import {NodeList} from "./features/groups/NodeList/NodeList";

export const App: React.FC = () => {
    return (
        <div className={"app"}>
            <GroupList className="list"/>
            <NodeList className={"nodes"}/>
        </div>
    );
};
