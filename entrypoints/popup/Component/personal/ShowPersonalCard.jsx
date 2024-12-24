import { Avatar, Card, Popconfirm,message } from "antd";
import {
  ShareAltOutlined,
  DownloadOutlined,
  DeleteOutlined,
  EditOutlined,
  UserOutlined,
  EnvironmentOutlined,
} from "@ant-design/icons";

const { Meta } = Card;

const ShowPersonalCard = ({ travel, onShare, onRemove, onEdit }) => {
  const clickDownload=(id)=>{
    message.info("download develop....")
  }
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
            maxHeight: "180px",
          }}
        />
      }
      actions={[
        <Popconfirm
          title="share the plan"
          onConfirm={() => onShare(travel.id)}
          okText="Yes"
          cancelText="No"
        >
          <ShareAltOutlined key="share" />
        </Popconfirm>,
        <Popconfirm
          title="Downloud the plan"
          onConfirm={() => clickDownload(travel.id)}
          okText="Yes"
          cancelText="No"
        >
          <DownloadOutlined />
        </Popconfirm>,
        <Popconfirm
          title="Delete the plan"
          onConfirm={() => onRemove(travel.id)}
          okText="Yes"
          cancelText="No"
        >
          <DeleteOutlined key="remove" />
        </Popconfirm>,
        <Popconfirm
          title="Edit the plan"
          onConfirm={() => onEdit(travel)}
          okText="Yes"
          cancelText="No"
        >
          <EditOutlined key="edit" />
        </Popconfirm>,
      ]}
    >
      <Meta
        //description={travel.title + "\n"}

        description={
          <>
            <span>{travel?.username}</span>
            <div style={{ color: "rgba(0, 0, 0, 0.88)" }}>
              <span >
                {travel.title}
              </span>
              <br />
              <EnvironmentOutlined />
              <span>{travel?.destination}</span>
            </div>
          </>
        }
        avatar={<Avatar src={travel?.picture} icon={<UserOutlined />} />}
      />
    </Card>
  );
};

export default ShowPersonalCard;
