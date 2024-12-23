import { Avatar, Card } from "antd";
import { 
  BiEdit, 
  BiTrash, 
  BiShareAlt, 
  BiSolidDownload,
  BiSolidUser 
} from "react-icons/bi";
const { Meta } = Card;

const ShowPersonalCard = ({ travel, onShare, onRemove, onEdit }) => {
  console.info(travel)
  return (
    <Card
      key={travel.id}
      style={{
        padding: "10px",
        width: "100%",
      }}
      cover={
        <img
          alt="example"
          src={travel.img_url}
          style={{
            maxHeight: "200px",
          }}
        />
      }
      actions={[
        <BiShareAlt key="share" onClick={() => onShare(travel.id)} />,
        <BiSolidDownload/>,
        <BiTrash key="remove" onClick={() => onRemove(travel.id)} />,
        <BiEdit key="edit" onClick={() => onEdit(travel)} />,
      ]}
    >
      <Meta
        //description={travel.title + "\n"}
        description={
          <span style={{ color: 'rgba(0, 0, 0, 0.88)' }}>
            {"Title: "+travel.title + "\n"}
          </span>
        }
        title={travel.destination}
        avatar={<Avatar src={travel?.picture} icon={<BiSolidUser />}/>}
      />
    </Card>
  );
};

export default ShowPersonalCard;
