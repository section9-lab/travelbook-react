import { Avatar, Card } from "antd";
import { BiEdit, BiTrash, BiShareAlt } from "react-icons/bi";
const { Meta } = Card;

const ShowPersonalCard = ({travel,onShare,onRemove,onEdit}) => {
    console.info("=====ShowPersonalCard======")
    console.info(travel)
  return (
    <Card
      style={{
        padding: '5px',
        width: '100%',
      }}
      cover={
        <img
          alt="example"
          src={travel.img_url}
          style={{
            maxHeight: "200px"
          }}
        />
      }
      actions={
        [
            <BiShareAlt key="share"onClick={() => onShare(travel.id)}/>,
            <BiTrash key="remove"onClick={() => onRemove(travel.id)} />,
            <BiEdit key="edit" onClick={() => onEdit(travel)} />,
        ]
      }
    >
      <Meta

        title={travel.title}
        description={"destination:"+travel.destination+"\n"}
        avatar={
            <Avatar src="" />
          }
      />
    </Card>
  );
};

export default ShowPersonalCard;
