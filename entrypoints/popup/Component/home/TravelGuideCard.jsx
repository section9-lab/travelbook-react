import HeartButton from "./HeartButton";
import ShowTravelCard from "./ShowTravelCard"


// 旅行指南卡片组件
const TravelGuideCard = (guide) => {
    const [showTravelCard, setShowTravelCard] = useState(false);

    const showCard = (guide) => {
        console.info("showCard")
        setShowTravelCard(guide)
    };

    return (
        <>
        <div className="travel-guide-card" onClick={() => showCard(guide)}>
            <img
                src={guide.img_url}
                alt={guide.destination}
                className="guide-image"
                style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                borderRadius: "10px",
                }}
            />
            <h4>{guide.title}</h4>
            <p>目的地：{guide.destination}</p>
            <HeartButton initialCount={guide.hot} travel_id={guide.id} />
        </div>
        <ShowTravelCard
        guide={guide}
        isOpen={showTravelCard}
        onClose={() => setShowTravelCard(false)}
        />
        </>

    )
}

export default TravelGuideCard;