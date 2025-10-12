import { Link } from "react-router-dom";

function TopicList({topicsData}) {

    return (
        <>
          <ul id="toc-list" className="toc-list" aria-label="Contents">
                {topicsData.map((topic,i) => (
                    //i need to replace this with topic item
                <li key={topic._id} >{topic._id}_
                    <Link to={`/notes/${topic._id}`} className="toc-link-button">
                       {topic.name}
                    </Link>
                </li>
              ))}  
            </ul>
        </>
    );
}

export default TopicList;