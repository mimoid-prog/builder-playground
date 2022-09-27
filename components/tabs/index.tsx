import { BuilderBlocks } from "@builder.io/react";
import { useState } from "react";
import styles from "./style.module.css";

interface Props {
  tabs: {
    label: string;
    content: any[];
  }[];
}

function Tabs({ tabs }: Props): JSX.Element {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className={styles.root}>
      <div className={styles.tabs}>
        {tabs.map((tab, index) => (
          <div
            key={tab.label}
            style={{
              padding: 20,
              color: activeStep === index ? "blue" : "#000",
            }}
            onClick={() => {
              setActiveStep(index);
            }}
          >
            {tab.label}
          </div>
        ))}
      </div>
      <div className={styles.tabContent}>
        {!!tabs.length && (
          <BuilderBlocks
            dataPath={`component.options.tabs.${activeStep}.content`}
            blocks={tabs[activeStep].content}
          />
        )}
      </div>
    </div>
  );
}

export default Tabs;
