package com.project.arc205.common.util;

import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;

public class Scheduler {

    private final ScheduledExecutorService scheduler;

    public Scheduler() {
        this.scheduler = Executors.newSingleThreadScheduledExecutor();
    }

    public void execute(Runnable command, long delay) {
        scheduler.schedule(command, delay, TimeUnit.SECONDS);
    }

}
