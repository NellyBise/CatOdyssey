import React from "react";
import { useQuery, gql } from "@apollo/client";
import { useParams } from "react-router-dom";
import { Layout, QueryResult } from "../components";
import ModuleDetail from "../components/module-detail";

const GET_MODULE_AND_PARENT_TRACK= gql`
    query getModuleAndParentTrack($moduleId: ID!, $trackId: ID!) {
  module(id: $moduleId) {
    id
    title
    content
    videoUrl
  }
  track(id: $trackId) {
    id
    title
    modules {
      id
      title
      length
    }
  }
}
`

const Module = () =>{
    const { moduleId, trackId} = useParams();
    
    const { loading, error, data } = useQuery(GET_MODULE_AND_PARENT_TRACK, {
        variables: { moduleId, trackId },
      });

    return (
    <Layout>
        <QueryResult error={error} loading={loading} data={data}>
            <ModuleDetail track={data?.track} module={data?.module}/>
        </QueryResult>
    </Layout>
    );
};

export default Module;